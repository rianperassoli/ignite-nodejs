import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/im-memory/RentalsRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJSDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayJSDateProvider: DayJSDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJSDateProvider = new DayJSDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJSDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      const rental = {
        user_id: "test",
        car_id: "12345",
        expected_return_date: dayAdd24Hours,
      };

      await createRentalUseCase.execute(rental);
      await createRentalUseCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      const rental = {
        user_id: "12345455",
        car_id: "test",
        expected_return_date: dayAdd24Hours,
      };

      await createRentalUseCase.execute(rental);
      await createRentalUseCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with invalid return time", async () => {
    expect(async () => {
      const rental = {
        user_id: "12345455",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      };

      await createRentalUseCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });
});
