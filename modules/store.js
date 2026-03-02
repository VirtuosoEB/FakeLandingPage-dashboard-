// modules/changeManager.js
import { supabase } from "./supabaseClient.js";
import { applyTextStyle, applyBackgroundStyle, applyButtonStyle } from "./styleApplier.js";

/**
 * Save a local change in localStorage
 */
export function saveChange(id, type, changes) {
  let changeList = JSON.parse(localStorage.getItem("changes")) || [];

  const existingIndex = changeList.findIndex(c => c.id === id && c.type === type);
  const change = { id, type, changes };

  if (existingIndex > -1) changeList[existingIndex] = change;
  else changeList.push(change);

  localStorage.setItem("changes", JSON.stringify(changeList));
  console.log("Updated change list:", changeList);
}

/**
 * Sync local changes to Supabase
 */
export async function storeChanges() {
  const raw = localStorage.getItem("changes");
  if (!raw) return;

  const pendingChanges = JSON.parse(raw);
  if (!pendingChanges.length) return;

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.warn("No user signed in");
    return;
  }

  // Fetch existing changes to merge safely
  const { data: existing, error: fetchError } = await supabase
    .from("users")
    .select("changes")
    .eq("id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error(fetchError);
    return;
  }

  const merged = [...(existing?.changes || [])];

  for (const change of pendingChanges) {
    const i = merged.findIndex(
      c => c.id === change.id && c.type === change.type
    );
    if (i !== -1) merged[i] = change;
    else merged.push(change);
  }

  const { error } = await supabase
    .from("users")
    .upsert(
      { id: user.id, changes: merged },
      { onConflict: "id" }
    );

  if (error) {
    console.error("Sync failed:", error);
    return;
  }

  localStorage.removeItem("changes");
  console.log("Changes synced safely.");
}


/**
 * Load changes from Supabase and store in localStorage
 */
export async function loadChanges() {
    console.log("test initiated");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return console.log("No user signed in!");

  const { data, error } = await supabase
    .from("users")
    .select("changes")
    .eq("id", user.id)
    .single();

  if (error) console.error("Error loading changes:", error);
  else if (data?.changes) {
    localStorage.setItem("currentVersion", JSON.stringify(data.changes));
    console.log("Loaded changes:", data.changes);
  } else {
    console.log("No changes found for this user.");
  }
}

/**
 * Apply changes from Supabase (currentVersion) + local changes
 */
export function applyChanges(preview) {
  const currentVersion = JSON.parse(localStorage.getItem("currentVersion")) || [];
  const changes = JSON.parse(localStorage.getItem("changes")) || [];

  if (!currentVersion.length && !changes.length) {
    console.log("No changes to apply!");
    return;
  }
 console.log("changes to apply")
  // Merge local changes over server changes
  const mergedChanges = [...currentVersion];
  changes.forEach(localChange => {
    const index = mergedChanges.findIndex(
      r => r.id === localChange.id && r.type === localChange.type
    );
    if (index > -1) mergedChanges[index] = localChange;
    else mergedChanges.push(localChange);
  });

  // Apply all merged changes to DOM
  mergedChanges.forEach(change => {
    console.log(change.id)
    const element = preview.contentDocument.getElementById(change.id);
    if (!element) {
        return
    };
    if (change.type === "background"){
      preview.contentDocument.body.style.backgroundColor = change.changes.backgroundColor;
      console.log(change.changes.backgroundColor)
      return;
    };

    console.log(element);
    console.log(change)

    switch (change.type) {
      case "text":
        element.style.color = change.changes.color;
        console.log(change.color);
        element.style.fontSize = change.changes.fontSize;
        element.textContent = change.changes.text;
        break;
      case "button":
        element.style.color = change.changes.color;
        element.style.fontSize = change.changes.fontSize;
        element.style.backgroundColor = change.changes.backgroundColor;
        element.textContent = change.changes.text;
        break;
    }
  });
}
