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

// 🔹 使用者登入
export const login = async (full_name, password) => {
  const response = await fetch(`${BASE_URL}/Member/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ full_name, password }),
    credentials: 'include', // 包含cookie在請求中
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `登入失敗: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
// 🔹 使用者註冊
export const register = async (userData) => {
  const { full_name, email, password } = userData;
  
  // 基本資料驗證
  if (!full_name || !email || !password) {
    throw new Error('必須提供使用者名稱、電子郵件和密碼');
  }
  
  try {
    const response = await fetch(`${BASE_URL}/Member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name,
        email,
        password,
      }),
      credentials: 'include', // 包含 cookie 以支援後續登入狀態
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // 處理不同的錯誤情況
      if (response.status === 409) {
        throw new Error(errorData.message || '使用者名稱或電子郵件已被使用');
      } else if (response.status === 400) {
        throw new Error(errorData.message || '提供的資料格式不正確');
      }
      
      throw new Error(errorData.message || `註冊失敗: ${response.status}`);
    }

    const data = await response.json();
    return data; // 返回註冊成功的資訊
  } catch (error) {
    // 捕捉網路錯誤或其他意外狀況
    if (error.message) {
      throw error;
    }
    throw new Error('註冊過程中發生錯誤，請稍後再試');
  }
};