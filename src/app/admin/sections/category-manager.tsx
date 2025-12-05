import { Category, MenuItem } from "@prisma/client";
import { ArrowUpDown, Eye, EyeOff, Trash2 } from "lucide-react";

import { upsertCategoryAction, deleteCategoryAction } from "../actions";

type CategoryWithItems = Category & {
  items: MenuItem[];
};

type Props = {
  categories: CategoryWithItems[];
};

export function CategoryManager({ categories }: Props) {
  return (
    <section className="rounded-3xl border border-[var(--color-border)] bg-white/90 p-8 shadow-sm">
      <div className="flex flex-col gap-3 pb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-400">Bölüm 01</p>
        <h2 className="text-3xl font-semibold text-stone-900">Kategoriler</h2>
        <p className="max-w-2xl text-sm text-stone-500">
          Çorba, kebap, soğuk meze gibi menü bölümlerini sıralayın, açıklamalar ekleyin ve gerekirse
          hızlıca gizleyin.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-dashed border-stone-200 p-5">
          <p className="text-sm font-semibold text-stone-600">Yeni kategori ekle</p>
          <form action={upsertCategoryAction} className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-500">Başlık</label>
              <input
                name="name"
                required
                placeholder="Örn. Ana Yemekler"
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500">Açıklama</label>
              <textarea
                name="description"
                placeholder="Misafirlerinize kısa bir yönlendirme yazısı"
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <label className="text-xs font-medium text-stone-500">Sıra</label>
                <input
                  type="number"
                  name="sortOrder"
                  defaultValue={categories.length * 10}
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-600">
                <input type="checkbox" name="isVisible" defaultChecked className="size-4 rounded" />
                Misafirlere açık
              </label>
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Kaydet
            </button>
          </form>
        </div>
        <div className="space-y-4">
          {categories.length === 0 && (
            <p className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-6 py-4 text-sm text-stone-600">
              Henüz kategori oluşturmadınız. Sol taraftaki formu kullanarak ilk bölümü ekleyin.
            </p>
          )}
          {categories.map((category) => (
            <details key={category.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <summary className="flex cursor-pointer flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1 break-words">
                  <p className="text-base font-semibold text-stone-900">{category.name}</p>
                  <p className="text-sm text-stone-500">{category.description ?? "Açıklama yok"}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-stone-500">
                  <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 font-semibold tracking-tight">
                    <ArrowUpDown className="size-3.5" />
                    {category.sortOrder}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 font-semibold">
                    {category.isVisible ? (
                      <>
                        <Eye className="size-3.5" />
                        Aktif
                      </>
                    ) : (
                      <>
                        <EyeOff className="size-3.5" />
                        Gizli
                      </>
                    )}
                  </span>
                </div>
              </summary>
              <div className="border-t border-stone-100 bg-stone-50/60 px-6 py-5">
                <form action={upsertCategoryAction} className="grid gap-4 md:grid-cols-2">
                  <input type="hidden" name="id" value={category.id} />
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-500">Başlık</label>
                    <input
                      name="name"
                      defaultValue={category.name}
                      className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-500">Sıra</label>
                    <input
                      name="sortOrder"
                      type="number"
                      defaultValue={category.sortOrder}
                      className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-stone-500">Açıklama</label>
                    <textarea
                      name="description"
                      defaultValue={category.description ?? ""}
                      className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600">
                    <input
                      type="checkbox"
                      name="isVisible"
                      defaultChecked={category.isVisible}
                      className="size-4 rounded"
                    />
                    Misafir menüsünde göster
                  </label>
                  <div className="flex items-center justify-end gap-3 md:col-span-2">
                    <DeleteCategoryButton categoryId={category.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Güncelle
                    </button>
                  </div>
                </form>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

async function DeleteCategoryButton({ categoryId }: { categoryId: number }) {
  async function deleteAction() {
    "use server";
    await deleteCategoryAction(categoryId);
  }

  return (
    <form action={deleteAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300"
      >
        <Trash2 className="size-4" /> Sil
      </button>
    </form>
  );
}



