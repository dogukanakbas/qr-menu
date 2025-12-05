import { Category, MenuItem, Prisma } from "@prisma/client";
import { Star, EyeOff, BadgeCheck, Trash2 } from "lucide-react";

import { ImageUploader } from "@/components/image-uploader";
import { formatCurrency } from "@/lib/utils";
import { deleteMenuItemAction, upsertMenuItemAction } from "../actions";

type CategoryWithItems = Category & {
  items: MenuItem[];
};

type Props = {
  categories: CategoryWithItems[];
};

const toPlainNumber = (value: Prisma.Decimal | number) => Number(value.toString());

export function MenuItemManager({ categories }: Props) {
  const totalItems = categories.reduce((acc, category) => acc + category.items.length, 0);

  return (
    <section className="rounded-3xl border border-[var(--color-border)] bg-white/90 p-8 shadow-sm">
      <div className="flex flex-col gap-3 pb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-400">Bölüm 02</p>
        <h2 className="text-3xl font-semibold text-stone-900">Ürünler</h2>
        <p className="max-w-2xl text-sm text-stone-500">
          Fiyat, açıklama, fotoğraf ve stok durumunu anlık yönetin. Her ürün mutlaka bir kategoriye
          bağlı olmalı.
        </p>
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
          Toplam {totalItems} ürün
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="rounded-2xl border border-dashed border-stone-200 p-5">
          <p className="text-sm font-semibold text-stone-600">Yeni ürün ekle</p>
          <form action={upsertMenuItemAction} className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-500">Ürün adı</label>
              <input
                name="name"
                required
                placeholder="Örn. Fırınlanmış kuzu incik"
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500">Kategori</label>
              <select
                name="categoryId"
                required
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Kategori seçin</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-stone-500">Fiyat (₺)</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.5"
                  required
                  placeholder="350"
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-600">
                <input type="checkbox" name="isAvailable" defaultChecked className="size-4 rounded" />
                Menude aktif
              </label>
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500">Kısa açıklama</label>
              <textarea
                name="description"
                placeholder="Taş fırında ağır ağır pişen kuzu incik..."
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <ImageUploader name="imageUrl" label="Görsel" />
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <input type="checkbox" name="featured" className="size-4 rounded" />
              Ana sayfada öne çıkar
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Kaydet
            </button>
          </form>
        </div>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="rounded-2xl border border-stone-200 bg-stone-50/70">
              <header className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-lg font-semibold text-stone-900">{category.name}</p>
                  <p className="text-sm text-stone-500">{category.description ?? "Açıklama yok"}</p>
                </div>
                <span className="text-xs font-semibold text-stone-500">
                  {category.items.length} ürün
                </span>
              </header>
              <div className="grid gap-4 border-t border-stone-200 px-6 py-4 lg:grid-cols-2">
                {category.items.length === 0 && (
                  <p className="rounded-xl border border-dashed border-stone-200 px-4 py-3 text-sm text-stone-500">
                    Bu kategoride ürün bulunmuyor.
                  </p>
                )}
                {category.items.map((item) => (
                  <details key={item.id} className="overflow-hidden rounded-2xl border border-white bg-white shadow-sm ring-1 ring-stone-100">
                    <summary className="flex cursor-pointer flex-col gap-3 rounded-2xl px-4 py-4 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1 break-words">
                        <p className="font-semibold text-stone-900">{item.name}</p>
                        <p className="text-sm text-stone-500">{item.description ?? "Açıklama yok"}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-500 md:justify-end">
                        <span className="text-sm font-semibold text-emerald-700">
                          {formatCurrency(toPlainNumber(item.price))}
                        </span>
                        {item.isAvailable ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
                            <BadgeCheck className="size-3" /> Menüde
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-1 text-stone-600">
                            <EyeOff className="size-3" /> Geçici olarak kapalı
                          </span>
                        )}
                        {item.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-700">
                            <Star className="size-3" /> Öne çıkan
                          </span>
                        )}
                      </div>
                    </summary>
                    <div className="border-t border-stone-100 bg-stone-50 px-4 py-4">
                      <form action={upsertMenuItemAction} className="space-y-3">
                        <input type="hidden" name="id" value={item.id} />
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <label className="text-xs font-medium text-stone-500">Ad</label>
                            <input
                              name="name"
                              defaultValue={item.name}
                              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-stone-500">Fiyat</label>
                            <input
                              name="price"
                              type="number"
                              step="0.5"
                              defaultValue={toPlainNumber(item.price)}
                              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-xs font-medium text-stone-500">Kategori</label>
                            <select
                              name="categoryId"
                              defaultValue={category.id}
                              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                            >
                              {categories.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-stone-500">Açıklama</label>
                          <textarea
                            name="description"
                            defaultValue={item.description ?? ""}
                            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                          />
                        </div>
                        <ImageUploader
                          name="imageUrl"
                          label="Görsel"
                          defaultValue={item.imageUrl ?? ""}
                          placeholder="Yükle veya URL gir"
                        />
                        <div className="flex flex-wrap gap-4 text-xs font-semibold text-stone-600">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="isAvailable"
                              defaultChecked={item.isAvailable}
                              className="size-4 rounded"
                            />
                            Menüde göster
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="featured"
                              defaultChecked={item.featured}
                              className="size-4 rounded"
                            />
                            Öne çıkar
                          </label>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <DeleteMenuItemButton itemId={item.id} />
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
          ))}
        </div>
      </div>
    </section>
  );
}

async function DeleteMenuItemButton({ itemId }: { itemId: number }) {
  async function deleteAction() {
    "use server";
    await deleteMenuItemAction(itemId);
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

