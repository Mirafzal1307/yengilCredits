import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    }
}))

function DiynamicFeilds() {
    const classes = useStyles()
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), characterId: '', propertyId: '' },
    ]);
    const [name, setProduct] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(inputFields);
    };

    const handleChangeInput = (id: any, event: any) => {
        const newInputFields = inputFields.map((i: any) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), characterId: '', propertyId: '' }])
    }

    const handleRemoveFields = (id: any) => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }
    const handleChangeStatus = (event: SelectChangeEvent) => {
        setProduct(event.target.value);
    };

    return (
        <Container>

            <form className={classes.root} onSubmit={handleSubmit} >
                {inputFields.map(inputField => (
                    <div key={inputField.id}>
                    
                        <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            style={{ padding: "0 !important", margin: "0 !important" }}
                        >
                            <Select
                                name='characterId'
                                value={inputField.characterId}
                                onChange={event => handleChangeInput(inputField.id, event)}
                                displayEmpty
                                required

                            >
                                <MenuItem value="">
                                    <span>Holatni tanlang</span>
                                </MenuItem>

                                <MenuItem value="true">Sotuvda</MenuItem>
                                <MenuItem value="false">Sotuvda emas</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            style={{ padding: "0 !important", margin: "0 !important" }}
                        >
                            <Select
                                name='propertyId'
                                value={inputField.propertyId}
                                onChange={event => handleChangeInput(inputField.id, event)}
                                displayEmpty
                                required

                            >
                                <MenuItem value="">
                                    <span>Holatni tanlang</span>
                                </MenuItem>

                                <MenuItem value="true">Sotuvda</MenuItem>
                                <MenuItem value="false">Sotuvda emas</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <RemoveIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleAddFields}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                ))}
                <button
                    className={classes.button}

                    color="primary"
                    type="submit"

                    onClick={handleSubmit}
                >Send --L </button>
            </form>
        </Container>
    );
}

export default DiynamicFeilds;
