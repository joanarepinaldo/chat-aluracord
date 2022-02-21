import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import {useRouter} from 'next/router';
import React from 'react';


function Title(props){
    const Tag = props.tag || 'h1';
    return [
        <>
            <Tag>{props.children}</Tag>

            <style jsx>{`
               ${Tag} {
                    color: ${appConfig.theme.colors.neutrals[50]};
                    font-size:24px;
                    font-weight:600;
                }
            `}</style>
        </>
    ]
}
// function HomePage (){
//     return [
//     <div>
//         <GlobalStyle/>
//         <Title tag="h2">Boa vindas de volta!</Title>
//         <h2>Discord Alura</h2>
        
//     </div>
//     ]
// }

// export default HomePage

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('');
    const [userData,setUserData] = React.useState({name: '', followers: 0, location: ''});
    const roteamento = useRouter();
    const [usernameValid, setUsernameValid] = React.useState('');
    const [test, setTest] = React.useState([]);

    function getUserData(valor) {

      test.forEach(function (timer) {
        clearTimeout(timer);
      })

      setTest([
        setTimeout(function () {
          fetch(`https://api.github.com/users/${valor}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setUserData(data);
          });
          
          
        }, 1000), ...test,
      ]);
    }

    function changeName(param) {
      if (param.length > 2) {
        setUsernameValid(param);
      } else {
        setUsernameValid('');
      }
    }

    
    
    
    
    return (
      <>
        
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[200],
            backgroundImage: 'url(https://c.tenor.com/2rbXXbmEAjMAAAAd/fsociety-code.gif)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[200],
              opacity: 0.8,
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function(infoEvent){
                infoEvent.preventDefault();
                // window.location.href='/chat';
                roteamento.push(`/chat?username=${username}`);
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Boas vindas de volta!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[50] }}>
                {appConfig.name}
              </Text>

  
              <TextField
                value={username} 
                onChange={function (event) {
                    const valor = event.target.value;
                    setUsername(valor);
                    changeName(valor);
                    getUserData(valor);

                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[300],
                    mainColor: appConfig.theme.colors.neutrals[300],
                    mainColorHighlight: appConfig.theme.colors.primary[300],
                    backgroundColor: appConfig.theme.colors.neutrals[200],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                disabled={(username.length < 3)}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals[300],
                  mainColor: appConfig.theme.colors.primary[300],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[400],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '32px',
                backgroundColor: appConfig.theme.colors.neutrals[400],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[300],
                borderRadius: '2px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '2px',
                  marginBottom: '16px',
                }}
                src={usernameValid != '' ? `https://github.com/${usernameValid}.png` : 'https://external-preview.redd.it/8zF-aN8VfeoSIlaP6eWH4QX0Ep-9wFsxflDN2_rD8ts.png?auto=webp&s=d04868c874548be3ed2ff2c3074875c8828169a5'}/>
              
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[300],
                  backgroundColor: appConfig.theme.colors.neutrals[200],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {userData.name || usernameValid || 'Mr. Robot'}
              </Text>
              <Text styleSheet={{marginBottom: '3px', fontSize: '14px'}}>Seguidores: {userData.followers}</Text>
              <Text styleSheet={{marginBottom: '3px', fontSize: '14px'}}>{userData.location}</Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }
