const BASE_URL = import.meta.env.VITE_API_URL;

// 獲取全部菜譜
export const fetchRecipes = async () => {
  const res = await fetch(`${BASE_URL}/Recipe`);
  if (!res.ok) throw new Error(`API 錯誤 ${res.status}`);
  return await res.json();
};

// 獲取單一菜譜詳情
export const fetchRecipeDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/RecipeDetails/${id}`);
  if (!res.ok) throw new Error(`API 錯誤 ${res.status}`);
  return await res.json();
};
