import { Box } from '@skynexui/components'
import Message from './Message';
import appConfig from '../../config.json';

export default function MessageList(props) {
    

    
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals[0],
                marginBottom: '16px',
            }}
        >
            
            {props.mensagens.map((mensagem) => {

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
