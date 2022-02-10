import UserCard from './UserCard';
import { MdDelete } from 'react-icons/md';
import { Popover } from '@mui/material';
import { useState } from 'react';
import { Box, Text, Image } from '@skynexui/components'
import appConfig from '../../config.json';

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
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[500],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${props.autor}.png`}
                    />
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
                                color: appConfig.theme.colors.neutrals[300]
                            }}
                        >{props.autor}</Text>
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            marginRight: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {props.data}
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
                            styleSheet={{ width: '20%' }}
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