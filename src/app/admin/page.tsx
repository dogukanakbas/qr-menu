import { prisma } from "@/lib/prisma";

import { CategoryManager } from "./sections/category-manager";
import { MenuItemManager } from "./sections/menu-item-manager";
import { TableManager } from "./sections/table-manager";

export default async function AdminPage() {
  const [categories, tables] = await Promise.all([
    prisma.category.findMany({
      include: { items: { orderBy: { name: "asc" } } },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.diningTable.findMany({ orderBy: { label: "asc" } }),
  ]);

  return (
    <div className="space-y-10">
      <CategoryManager categories={categories} />
      <MenuItemManager categories={categories} />
      <TableManager tables={tables} />
    </div>
  );
}



