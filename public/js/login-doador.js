
 async function login(endpoint,Email_user, Senha_user ,redirect) {
      const res = await fetch(`/api/usuario/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Senha_user,Email_user  })
      });

      const data = await res.json();

      if (res.ok) {
        
        alert("Login feito!");
        window.location.href = redirect;
      } else {
        alert(data.error);
      }
    }

    document.getElementById("form-cadastro").addEventListener("submit", (e) => {
      e.preventDefault();
      const Email_user = document.getElementById("txtemail").value;
      const Senha_user = document.getElementById("txtsenha").value;
      
      login("login",Email_user,Senha_user, "/user/feed.html");
    });
