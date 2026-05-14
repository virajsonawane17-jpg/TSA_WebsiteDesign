function cacheKey(text: string, lang: string): string {
  return `trh-tx:${lang}:${text.slice(0, 180)}`;
}

export async function translateText(text: string, targetLang: "es"): Promise<string> {
  if (!text?.trim()) return text;

  if (typeof window !== "undefined") {
    const cached = sessionStorage.getItem(cacheKey(text, targetLang));
    if (cached) return cached;
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) return text;
    const data: [[string, string][]] = await res.json();
    const result = data[0]?.map((chunk) => chunk[0]).join("") ?? text;

    if (typeof window !== "undefined") {
      try { sessionStorage.setItem(cacheKey(text, targetLang), result); } catch { /* quota full */ }
    }

    return result;
  } catch {
    return text;
  }
}

export async function translateFields<T extends object>(
  item: T,
  keys: (keyof T)[],
  targetLang: "es"
): Promise<T> {
  const overrides: Partial<Record<keyof T, string>> = {};
  await Promise.all(
    keys.map(async (key) => {
      const val = (item as Record<keyof T, unknown>)[key];
      if (typeof val === "string" && val.trim()) {
        overrides[key] = await translateText(val, targetLang);
      }
    })
  );
  return { ...item, ...overrides };
}

export async function translateItemList<T extends object>(
  items: T[],
  keys: (keyof T)[],
  targetLang: "es"
): Promise<T[]> {
  return Promise.all(items.map((item) => translateFields(item, keys, targetLang)));
}
