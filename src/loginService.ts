interface LoginResponse {
    token: string;
  }
  
  export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Invalid email or password');
    }
  
    const data = await response.json();
    return data;
  }
  
  