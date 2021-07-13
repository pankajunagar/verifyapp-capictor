var handleCredentialResponse = function (response) {
    $.ajax({
      type: 'POST',
      url: '/api/v2.4/one-tap-login',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      contentType: 'application/JSON; charset=utf-8',
      success: function(result) {
        if (!result) {
          return ;
        }
        
        if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);
          
        }
        location.reload();
      },
      processData: false,
      data: JSON.stringify({credential: response.credential})
    });
  }
  