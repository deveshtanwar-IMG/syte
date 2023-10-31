import { Box, Button, Checkbox, Container, FormControl, TextField, Typography } from "@mui/material";
import Header from "../../component/Header";

// css import
import styles from './inventory.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../store/Slice";


const items = [{
  id: '1',
  name: 'Cement',
  quantity: 0,
  price: 0,
  totalAmount: 0
}, {
  id: '2',
  name: 'Steel',
  quantity: 0,
  price: 0,
  totalAmount: 0
}, {
  id: '3',
  name: 'Ash Bricks',
  quantity: 0,
  price: 0,
  totalAmount: 0
}, {
  id: '4',
  name: 'Sand',
  quantity: 0,
  price: 0,
  totalAmount: 0
}, {
  id: '5',
  name: 'Concrete',
  quantity: 0,
  price: 0,
  totalAmount: 0
}]

const Inventory = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxData = useSelector(state => state.material);

  const [search, setSearch] = useState('');

  // const localData = JSON.parse(localStorage.getItem('material'));

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  const checkboxHandler = (val) => {
    const find = reduxData.findIndex(item => item.id === val.id);
    if (find < 0) {
      dispatch(addItem([val]));
    }
    else {
      dispatch(removeItem(val));
    }
  }

  const nextHandler = () => {
    navigate('/')
  }

  return (
    <>
      <Header value='Material Inventory' />

      <Container fixed sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField placeholder="Search Material" onChange={searchHandler}>
          </TextField>
        </FormControl>
      </Container>

      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: '5px', justifyContent: 'center', width: '350px', overflow: 'auto' }}>
          {
            reduxData.map((val) => {
              return (
                <Box className={styles.materials} key={val.id}>
                  <Box>{val.name}</Box>
                </Box>
              )
            })
          }
        </Box>
      </Container>

      <Box sx={{ height: "400px", overflow: 'auto' }}>
        {items.length > 0 && items.filter((val) => {
          return search.toLowerCase() === '' ? val.name : val.name.toLowerCase().includes(search);
        }).map((val) => {
          let ischecked = false;

          reduxData.forEach((item) => {
            if (item.id === val.id) {
              ischecked = true;
            }
          })
          return (
            <Box className={styles.items_box} key={val.id}>
              <Typography>{val.name}</Typography>
              <Typography variant="overline" sx={{ color: "gray" }}>
                (in bags)
              </Typography>
              <Checkbox color="success" onClick={() => { checkboxHandler(val) }}
                checked={ischecked}
              />
            </Box>
          )
        })
        }
      </Box>
      <Box className={styles.next_btn}>
        <Button
          variant='contained'
          color='warning'
          onClick={nextHandler}>
          Next
        </Button>
      </Box>
    </>
  )
}

export default Inventory;
