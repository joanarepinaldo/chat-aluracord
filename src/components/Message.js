import UserCard from './UserCard';
import { MdDelete } from 'react-icons/md';
import { Popover } from '@mui/material';
import { useState } from 'react';
import { Box, Text, Image } from '@skynexui/components'
import appConfig from '../../config.json';
import Link from 'next/link';

export default function Message(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    

    return (
        <>
            <Text
                key={props.id}
                tag="li"
                styleSheet={{

                    borderRadius: '5px',
                    fontSize:'20px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[400],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'flex-start',
                    }}
                >
                    <Link href={`https://github.com/${props.autor}`} >
                    <a target="_blank" rel="noreferrer">
                    <Image
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        styleSheet={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${props.autor}.png`}
                    />
                    </a>
                    </Link>
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <UserCard autor={props.autor} />
                    </Popover>

                    <Text tag="strong">
                        <Text
                            tag='a'
                            href={`https://github.com/${props.autor}`}
                            styleSheet={{
                                fontSize: '18px',
                                margin: "5px 5px",
                                color: appConfig.theme.colors.neutrals[200]
                            }}
                        >{props.autor}</Text>
                    </Text>
                    
                   

                </Box>
                <Box styleSheet={{
                        display: 'flex',
                        alignItems: 'flex-start',
                    }}
                    >
                <Text
                        styleSheet={{
                            fontSize: '10px',
                            margin: "5px 2px",
                            color: appConfig.theme.colors.neutrals[0],
                        }}
                        tag="span"
                    >
                        {new Date(props.data).toLocaleString('pt-BR').substring(0,16)}
                    </Text>
                    {props.usuarioLogado === props.autor && <MdDelete
                        cursor='pointer'
                        onClick={(evento) => {

                            evento.preventDefault();
                            props.ApagaMensagem(props.id)
                        }}
                        
                    />}
                    </Box>
                {props.texto.startsWith(':sticker:')
                    ? (
                        <Image
                            styleSheet={{ width: '8%' }}
                            src={props.texto.replace(':sticker:', '')}
                        />
                    )
                    : (
                        props.texto
                    )}
                
            </Text>
        </>
    )

}
