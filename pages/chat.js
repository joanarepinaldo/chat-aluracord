import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import {useRouter} from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { MdDelete, MdLogout  } from 'react-icons/md';
import MessageList from '../src/components/MessageList';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

function escutaMensagensEmTempoReal(AtualizaListaMsgs) {
    return supabaseClient
      .from('mensagens')
      .on('*', AtualizaListaMsgs) 
      .subscribe()
  }

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const roteamento = useRouter();
    const usuarioLogado=roteamento.query.username;
    console.log(roteamento)
    function AtualizaListaMsgs() {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaDeMensagens(data)
                
            })

    }
        
     React.useEffect(() => {
        AtualizaListaMsgs()
        escutaMensagensEmTempoReal(AtualizaListaMsgs)
    }, []);

    function ApagaMensagem(id) {
        supabaseClient
            .from("mensagens")
            .delete(false)
            .match({ "id": id })
            .then(() => AtualizaListaMsgs())
    }

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */

    
    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
          // id: listaDeMensagens.length + 1,
          de: usuarioLogado,
          texto: novaMensagem,
        };
    
        supabaseClient
          .from('mensagens')
          .insert([
            // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
            mensagem
          ])
          .then(({ data }) => {
            setListaDeMensagens([
                data[0],
                ...listaDeMensagens
            ])
        })
    
        setMensagem('');
      }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://www.pixel4k.com/wp-content/uploads/2020/01/mr-robot-art_1577914839.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[0],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[500],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                     <MessageList
                        supabaseClient={supabaseClient}
                        mensagens={listaDeMensagens}
                        setListaDeMensagens={setListaDeMensagens}
                        usuarioLogado={usuarioLogado}
                        ApagaMensagem={ApagaMensagem}
                    />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                fontSize: '15px',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                        />
                        {/* CallBack */}
                        <ButtonSendSticker
                        onStickerClick={(sticker) => {
                            // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                            handleNovaMensagem(':sticker: ' + sticker);
                        }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading3'>
                    Chat
                    
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label={< MdLogout size={18}  />}
                    href="/"
                    styleSheet={{
                        borderRadius: '5px',
                        minWidth: '42px',
                        minHeight: '42px',
                        backgroundColor: appConfig.theme.colors.neutrals[300],
                        marginRight: '10px',
                        color: appConfig.theme.colors.neutrals[200],
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[200],
                            color: 'black'
                        }
                    }}
                    buttonColors={{
                        mainColorLight: appConfig.theme.colors.neutrals[200],
                        
                    }}
                />
            </Box>
        </>
    )
}

function MessageList2(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                wordBreak: 'break-word',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals[0],
                marginBottom: '1px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        autor={mensagem.de} 
                        data={mensagem.created_at} 
                        texto={mensagem.texto} 
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[400],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            {props.usuarioLogado === props.autor && <MdDelete
                                cursor='pointer'
                                onClick={(evento) => {

                                    evento.preventDefault();
                                    props.ApagaMensagem(props.id)                                    
                                }}
                            />}
                            <Text
                                styleSheet={{
                                    fontSize: '18px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* {mensagem.texto} */}
                        {/* [Declarativo] */}
                        {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:')
                        ? (
                            <Image src={mensagem.texto.replace(':sticker:', '')} />
                        )
                        : (
                            mensagem.texto
                        )}
                        {/* if mensagem de texto possui stickers:
                                    mostra a imagem
                                    else 
                                    mensagem.texto */}
                        {/* {mensagem.texto} */}
                    </Text>
                );
            })}
        </Box>
    )
}
