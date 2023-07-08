// Assumes we have defined a global variable of accessToken (prior to calling to this method)
function getAccessToken(callback) {
    // Load the Service Account key JSON file
    fetch('service_account_key.json')
      .then(response => response.json())
      .then(credentials => {
        // Get an access token using the Service Account credentials
        // TO DO: For production, create a user account that impersonates the service account (better practice)
        const tokenEndpoint = 'https://accounts.google.com/o/oauth2/token';
        const payload = new URLSearchParams();
        //const privateKeyTest = 'assertion%3A%20-----BEGIN%20PRIVATE%20KEY-----%0AMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQC4%2BBpQ0naRto%0Ab18Dtj5tY2dfUgqpCxqa1EIpnS6gTr9E%2FcYIj4ZNagaI0g4aM3jI7ef9fmYhqy97%0AwG5lLEm8ruJkarI2R6JK7pgo%2F9aet%2Bs8gQ%2BuGwa4AiAw6dNV6ZGus3EjP75KErIS%0An5VSgOR7emUQXNP1lXutf36LUs9lhWKUfKpupo%2BNLwkSlclhlPwRt9qOAoeHgDbz%0AjZYYoQitI8kMl8CRosESNXpcBLN4m6oTUL2gib4cEgFa%2BRzw5WhgIKmhg%2F3az3OC%0A2dEwnLn6zgSabfZC7ElSneMbGi2Sw6hw95YszPxppMfy1AzoCFWZk%2B1UW9pVemt%2F%0AJ%2FvDLkdTAgMBAAECggEAJwYUHAheqEbR6kwBsYuMuC4OJNYZw82eZu5rnqyqI03C%0AGOnVLKPnWDwMD7v%2FAzEmdeISQv1joOsgVAErc%2FTTu%2F2934IX%2FZCAQ7fveLlMg6cS%0AC95Vl53gK8HSUfp6NsJCHlfwX%2BFEC1boag%2FfDYO51%2BOEc4ZGB%2BnLMicZEH8vAeal%0AnCyvyE9iZpOiR7LU1QtpLa1tzaqzMhBR05zirP%2Bg0A6oXJsl7E08Sm5v9Hpd%2F3%2BN%0AcSHuEYprLSoMeDUUQttHB6PpnCwl6k626YK2oYN2eWxb6Ht44q822TLlx1u%2BCQkD%0Ap08eEgaYT6KjHikQSGAOa9b%2BnKAmt3K8rYfCGf%2BD8QKBgQDnFJoXOV%2BE%2F%2FW9gtGJ%0A%2Bt9Xbu1irwRqxjzZ8RHsO0y%2BoXN0j0g56NnDAUwZN6Q0tAIBbIcgbmxS7kdm%2B70a%0AYsGokWRL0fof36ESu4QCrzctl3KWD61mDpKaSL1w9vWUzUDZYWj0Wram5FKWlThn%0ARD3DY%2BfetpmCV4YuArB566NmOQKBgQDmewbU%2FnEyXp33LB4IjRWuxpjVJMQo2%2B3W%0AgNqzwkAn0O6bxHq6AQme10Yqv9Pq32PukS8235i%2F1zJsLVjyYCr%2FqIX8zoXt7GyO%0AdrWJHL%2BIabZTTm98BZ4FFAtoc8mFfgn9TllQBILdwJGhaFmPfmynvqY80E5XlXdf%0AJ4iyA9L56wKBgQCYxcYaFJRSGecdo59k2bdO1seatpr0%2FJq%2Be%2BKdi5bxcUwjg5b8%0AsjVF91WYVnD5ZwjsaBPuHRMAwQfzzfr3ttLR302v0uLKr86N0%2Bsy2yRfwADBtRuu%0AnXPPDMgyJxO1jP2SuhPpeQ%2FIxqrTY1Qm8bbjtulVFOPoiHTtdlm2QVOGAQKBgFmP%0A9zCvi1dSczoIl8ck5Acdv2gcOGnURND1E4eE9Z9DTmWTbUl4e7%2BQ0gBsuLHtiwy6%0AuEkvjFEIE9z7pjPRcQQV%2FbMmod6539lggdy9IiSlR6eJtELSf%2FxjNKerTuUj%2FEfF%0AuWkhx6TaXv0E6sCbFSf%2BKuU44SihuVhtqW3blJFvAoGBALtvfL8UaFDUrcnHHJaB%0AhkoZyhPsRAr08j7kV%2FXktlISBtgxnWpllWnsuuakFEN%2Beh83BDVusB4RBbRnqkOx%0ABTiUCmQHDolpkaYDmTpwV3JJQYmUqJ6OYSgm91oHCoIvr42ftyiTRyoWOJqXPaXZ%0A2Yl3U6HgjtMmXR%2FVD%2B8HMSS6%0A-----END%20PRIVATE%20KEY-----%0A%0A';
        eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRjMjAxMmNmOTA4NTA0Nzc2ZTg4NjIwOTNiZTIyMTViOWJhNmMwYTIifQ.eyJpc3MiOiJ0aGUtZmFsY29uaS1nZW1zQGdlbi10aGUtZmFsY29uaS1nZW1zLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoidGhlLWZhbGNvbmktZ2Vtc0BnZW4tdGhlLWZhbGNvbmktZ2Vtcy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92NC90b2tlbiIsImlhdCI6MTY4ODgyNTE1OCwiZXhwIjoxNjg4ODMwMTc1LCJzY29wZSI6Imh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvY2xvdWQtcGxhdGZvcm0ifQ.euAKiEv_GTV6cOCXPZkaec3R4UOiyvF4J0gUsQg43tdjz9BB0Wsf98SI9fn1SrbOMqZqtzFkh8W60_QCjj-iSEfRodj3eMUq2ON78G9QnDtqrsSFucMM4VKoPvZLv0SNZV1K_vZaoFbssCdnHnCEz9oJ5KUGm0q7v_6tozWZaXm-y8PuiorZgw7GRTS3Tk42_unwdfpOGj2S88GWKVDHXJj7-h6vjkpr98rXthtm71cmCZETuQ_MrJHZT8W72CGefSfoi3HKuQaHGPRgIUmJdKfVSYlitSXkPn_u_UJ1Q0gbTY2bqolEQyPS1hlpXfrbpmsa3vt1p16vHuORR6e9TA
        payload.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
        payload.append('assertion', encodeURIComponent(privateKeyTest));
        payload.append('scope', 'https://www.googleapis.com/auth/cloud-platform');

        fetch(tokenEndpoint, {
          method: 'POST',
          body: payload
        })
          .then(response => response.json())
          .then(data => {
            accessToken = data.access_token; // Assign the access token to the global variable
            callback(null);
          })
          .catch(error => {
            callback(error);
          });
      })
      .catch(error => {
        callback(error);
      });
  }