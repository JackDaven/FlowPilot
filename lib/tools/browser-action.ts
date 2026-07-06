export type ToolHistoryItem = {
  id: string;
  mode: string;
  input: string;
  output: string;
  createdAt: string;
};

export const copyText = async (value: string) => {
  if (!value) return false;
  await navigator.clipboard.writeText(value);
  return true;
};

export const downloadText = (value: string, filename: string) => {
  if (!value) return false;

  const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return true;
};

export const readHistory = (storageKey: string): ToolHistoryItem[] => {
  try {
    const value = localStorage.getItem(storageKey);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

export const saveHistory = (storageKey: string, item: Omit<ToolHistoryItem, "id" | "createdAt">, limit = 8) => {
  const next: ToolHistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  const items = [next, ...readHistory(storageKey)].slice(0, limit);
  localStorage.setItem(storageKey, JSON.stringify(items));
  return items;
};

export const clearHistory = (storageKey: string) => {
  localStorage.removeItem(storageKey);
};

export const renderHistory = (
  container: HTMLElement,
  items: ToolHistoryItem[],
  onRestore: (item: ToolHistoryItem) => void
) => {
  container.replaceChildren();

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "No history yet.";
    container.append(empty);
    return;
  }

  for (const item of items) {
    const button = document.createElement("button");
    button.className = "history-item";
    button.type = "button";
    button.addEventListener("click", () => onRestore(item));

    const label = document.createElement("span");
    label.textContent = item.mode;

    const preview = document.createElement("small");
    preview.textContent = item.output || item.input;

    button.append(label, preview);
    container.append(button);
  }
};
