import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoryRepository implements ICategoriesRepository {
  private static INSTANCE: CategoryRepository;
  private categories: Category[];

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new CategoryRepository();
    }

    return this.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoryRepository };
