
 async function login(endpoint,email_ong, senha_ong,cnpj ,redirect) {
      const res = await fetch(`/api/ongs/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_ong, senha_ong,cnpj })
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
      const email_ong = document.getElementById("txtemail").value;
      const senha_ong = document.getElementById("txtsenha").value;
      const  cnpj = document.getElementById("txtcnpj").value;
      login("login",email_ong,senha_ong,cnpj, "/ong/feed.html");
    });
