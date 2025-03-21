const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// 獲取全部菜譜
export const fetchRecipes = async () => {
  const res = await fetch(`${BASE_URL}/Recipe`);
  if (!res.ok) throw new Error(`API 錯誤 ${res.status}`);
  return await res.json();
};

// 🔹 獲取單一菜譜詳情
export const fetchRecipeDetails = async (id) => {
  const apiUrl = `${BASE_URL.replace(/\/$/, '')}/RecipeDetails/${id}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`API 回應錯誤: ${response.status}`);
  }

  const data = await response.json();
  if (data && data.data) {
    return data.data;  // ✅ 回傳實際菜譜資料
  } else {
    throw new Error('API 回傳資料格式錯誤');
  }
};