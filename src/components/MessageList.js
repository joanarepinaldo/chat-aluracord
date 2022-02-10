import { Box } from '@skynexui/components'
import Message from './Message';
import appConfig from '../../config.json';

export default function MessageList(props) {
    // function removeMensagem(id) {
    //     const novaLista = props.mensagens.filter(mensagem => mensagem.id !== id) //cria uma nova lista somente com os elementos que não correspondem ao filtro
    //     props.setListaMensagens([...novaLista])
    // }

    

    
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals[500],
                marginBottom: '16px',
            }}
        >
            
            {!props.loading && props.mensagens.map((mensagem) => {

                return (
                    <Message 
                    id={mensagem.id} 
                    autor={mensagem.de} 
                    data={mensagem.created_at} 
                    texto={mensagem.texto} 
                    ApagaMensagem={props.ApagaMensagem}
                    usuarioLogado={props.usuarioLogado}
                    />
                )
            })}
        </Box>
    )
}