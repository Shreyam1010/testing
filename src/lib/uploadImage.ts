import { apiUrl } from "@/lib/api";

export async function uploadImage(file: File, folder = "uploads"): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(apiUrl(`/api/upload?folder=${encodeURIComponent(folder)}`), {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Upload failed (${res.status}): ${txt}`);
  }
  const data = await res.json();
  if (!data?.url) throw new Error("Upload response missing url");
  return data.url as string;
}
