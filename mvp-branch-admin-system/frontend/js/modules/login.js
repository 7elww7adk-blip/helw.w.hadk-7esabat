window.renderLogin = function () {
  return `
  <div class="card" style="max-width:420px;margin:40px auto;">
    <h2>تسجيل الدخول</h2>
    <div class="grid">
      <div>
        <label>اسم المستخدم</label>
        <input id="login-username" placeholder="owner" />
      </div>
      <div>
        <label>كلمة المرور</label>
        <input id="login-password" type="password" placeholder="******" />
      </div>
    </div>
    <button class="primary" onclick="window.actions.submitLogin()">دخول</button>
  </div>`;
};
