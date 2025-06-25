import {  useEffect, useMemo, useState } from "react";
import {
  Box,
  debounce,
  List,
  ListItemButton,
  TextField,
  Typography
} from "@mui/material";
import {
  useController,
  type FieldValues,
  type UseControllerProps
} from "react-hook-form";
import axios from "axios";



type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value|| '')
  const locationUrl= 'https://us1.locationiq.com/v1/reverse?key=pk.02c0963026ec4ee1cbcc8d9499d1dad0&lat=51.50344025&lon=-0.12770820958562096&format=json&'


useEffect(() => {
if(field.value && typeof field.value ==='object'){
    setInputValue(field.value.venue || '');
}
else{
    setInputValue(field.value || '');
}
},[field.value])

const fetchSuggestions = useMemo(
    () => debounce(async (query:string) => {
 if(!query || query.length <3){
    setSuggestions([]);
    return;
 }
 setLoading(true)

 try {
    const res= await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`)
    setSuggestions(res.data)
 } catch (error) {
    console.log(error)
 }
 finally{
    setLoading(false)
 }
    },500),[locationUrl]
)
const handleChange= async (value:string) => {
    field.onChange(value);
    await fetchSuggestions(value);
}

const handleSelect = (location : LocationIQSuggestion) => {
    const city = location.address?.city || location.address?.town || location.address?.village 
    const venue = location.display_name
    const latitude= location.lat
    const longitude = location.lon
    setInputValue(venue)
    field.onChange({venue,city,latitude,longitude});
    setSuggestions([]);
}
  return (
    <Box>
      <TextField
        {...props}
        value={inputValue}
        onChange={e => handleChange(e.target.value)}
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {loading && <Typography>Loading...</Typography>}
      {suggestions.length > 0 && (
        <List>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}

export default LocationInput;
