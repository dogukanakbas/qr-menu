import { DiningTable } from "@prisma/client";
import { Link, MapPin, Trash2 } from "lucide-react";

import { publicMenuUrl } from "@/lib/utils";
import { deleteTableAction, upsertTableAction } from "../actions";
import { TableQrCard } from "./table-qr-card";

type Props = {
  tables: DiningTable[];
};

export function TableManager({ tables }: Props) {
  const demoUrl = publicMenuUrl("demo-masa");

  return (
    <section className="rounded-3xl border border-[var(--color-border)] bg-white/90 p-8 shadow-sm">
      <div className="flex flex-col gap-3 pb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-400">Bölüm 03</p>
        <h2 className="text-3xl font-semibold text-stone-900">Masalar & QR Kodları</h2>
        <p className="max-w-2xl text-sm text-stone-500">
          Her masa için benzersiz bir slug belirleyin. Oluşturulan bağlantıyı çıktı alıp QR olarak
          masaya yerleştirin.
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <div className="rounded-2xl border border-dashed border-stone-200 p-5">
          <p className="text-sm font-semibold text-stone-600">Yeni masa oluştur</p>
          <form action={upsertTableAction} className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-500">Masa adı</label>
              <input
                name="label"
                placeholder="Örn. Bahçe-3"
                required
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500">Slug (URL)</label>
              <input
                name="slug"
                placeholder="bahce-3"
                required
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm lowercase focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-stone-500">Kapasite</label>
                <input
                  name="seatingCapacity"
                  type="number"
                  min="1"
                  placeholder="4"
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-600">
                <input type="checkbox" name="isActive" defaultChecked className="size-4 rounded" />
                Aktif
              </label>
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500">Not</label>
              <textarea
                name="notes"
                placeholder="Örn. Baca yanında"
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Kaydet
            </button>
            <div className="rounded-xl bg-stone-50 px-4 py-3 text-xs text-stone-500">
              Demo link:
              <a href={demoUrl} className="ml-2 font-semibold text-emerald-700" target="_blank">
                {demoUrl}
              </a>
            </div>
          </form>
        </div>
        <div className="space-y-6">
          {tables.length === 0 && (
            <p className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-6 py-4 text-sm text-stone-600">
              Henüz masa tanımlanmadı. Sol taraftaki formdan ilk masayı ekleyin.
            </p>
          )}
          {tables.map((table) => (
            <div key={table.id} className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1 break-words">
                  <p className="text-lg font-semibold text-stone-900">{table.label}</p>
                  <p className="text-sm text-stone-500">Slug: <span className="font-mono text-xs">{table.slug}</span></p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-stone-500">
                  {table.seatingCapacity && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1">
                      <MapPin className="size-3.5" /> {table.seatingCapacity} kişilik
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${
                      table.isActive ? "bg-emerald-50 text-emerald-700" : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {table.isActive ? "Aktif" : "Pasif"}
                  </span>
                </div>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-[240px_1fr]">
                <TableQrCard label={table.label} slug={table.slug} url={publicMenuUrl(table.slug)} />
                <div className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                  <form action={upsertTableAction} className="space-y-3">
                    <input type="hidden" name="id" value={table.id} />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-stone-500">Masa adı</label>
                        <input
                          name="label"
                          defaultValue={table.label}
                          className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-stone-500">Slug</label>
                        <input
                          name="slug"
                          defaultValue={table.slug}
                          className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm lowercase focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-stone-500">Kapasite</label>
                        <input
                          name="seatingCapacity"
                          type="number"
                          defaultValue={table.seatingCapacity ?? ""}
                          className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                        />
                      </div>
                      <label className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-stone-600">
                        <input
                          type="checkbox"
                          name="isActive"
                          defaultChecked={table.isActive}
                          className="size-4 rounded"
                        />
                        Aktif
                      </label>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-500">Not</label>
                      <textarea
                        name="notes"
                        defaultValue={table.notes ?? ""}
                        className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={publicMenuUrl(table.slug)}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600"
                      >
                        <Link className="size-4" /> Sayfayı aç
                      </a>
                      <DeleteTableButton tableId={table.id} />
                      <button
                        type="submit"
                        className="ml-auto inline-flex items-center justify-center rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Güncelle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function DeleteTableButton({ tableId }: { tableId: number }) {
  async function deleteAction() {
    "use server";
    await deleteTableAction(tableId);
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



