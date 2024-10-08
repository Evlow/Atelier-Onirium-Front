import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../App/Api/agent";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('Ne devrait pas voir cela'))
            .catch(error => setValidationErrors(error));
    }

    return (
        <Container>
            <Typography gutterBottom variant='h2' color="white">Erreurs à des fins de test</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
                <Button variant='contained' onClick={getValidationError}>Test Erreurs de Validation</Button>
            </ButtonGroup>
            {validationErrors.length > 0 && 
                <Alert severity='error'>
                    <AlertTitle>Erreurs de Validation</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            } 
        </Container>
    )
}