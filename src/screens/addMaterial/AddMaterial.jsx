import { Box, Button, Container, Icon, Typography } from '@mui/material';
import Header from '../../component/Header';
import styles from './addMaterial.module.css';
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../store/Slice';

const AddMaterial = () => {

  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.material);
  const localData = JSON.parse(localStorage.getItem('material'))
  const [data, setData] = useState([]);
  const [calculation, setCalculation] = useState({
    id: 0,
    quantity: localData ? localData.quantity: 0,
    price: 0
  });

  useEffect(() => {
    if (localData != null) {
      if (localData.length == 0) {
        setData(reduxData);
      }
      else {
        setData(localData);
      }
    }
    else {
      setData(reduxData);
    }
  }, [])

  useEffect(() => {
    const totalAmount = calculation.quantity * calculation.price;
    setData(prevData => {
      return prevData.map(item => {
        if (item.id === calculation.id) {
          return {
            ...item,
            quantity: calculation.quantity,
            price: calculation.price,
            totalAmount: totalAmount
          };
        }
        return item;
      });
    });
  }, [calculation]);

  const deleteHandler = (val) => {
    const find = data.findIndex(name => name == val);

    setData(current => current.filter((val, index) => {
      return index !== find;
    }));

    dispatch(removeItem(val));
    // for removing items from localStorage
    setData((state) => {
      localStorage.setItem('material', JSON.stringify(state));
      return state;
    }
    )
  }

  const updateQuantityData = (e, id) => {
    setCalculation({
      ...calculation,
      quantity : e.target.value,
      price : 0,
      id: id
    }
    )
  }
  const updatePriceData = (e, id) => {
    setCalculation({
      ...calculation,
      price: e.target.value,
      id: id
    }
    )
  }

  const storageHandler = () => {
    localStorage.setItem('material', JSON.stringify(data));
  }

  return (
    <>
      <Header value="Add Material Purchase" />
      <Container fixed sx={{ mt: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link to='/inventory'>
            <Button
              variant='contained'
              color='warning'
            >
              + Add Material
            </Button>
          </Link>
        </Box>
        <hr style={{ marginTop: '20px' }} />
      </Container>

      {/* Item box */}
      <Box sx={{ height: '400px', overflow: 'auto' }}>
        {data != null && data.map((val) => {
          return (
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0px' }} key={val.id}>
              <Box className={styles.items_main_box}>
                <Box className={styles.delete_bar}>
                  <Typography >{val.name}</Typography>
                  <Icon>
                    <Delete onClick={() => { deleteHandler(val) }} />
                  </Icon>
                </Box>
                <Box className={styles.delete_bar}>
                  <input type='number' className={styles.text_field} placeholder='Quantity in bags' name='quantity' onChange={(e) => { updateQuantityData(e, val.id) }} value={val.quantity}/>
                  <Typography color='yellow'>x</Typography>
                  <input type='number' className={styles.text_field} placeholder='Unit Price' name='price' onChange={(e) => { updatePriceData(e, val.id) }} value={val.price}/>
                  <Typography color='yellow'>=</Typography>
                  <input type='number' className={styles.text_field} placeholder='Total Price' value={val.totalAmount} readOnly />
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>

      <Box className={styles.save_btn}>
        <Button
          variant='contained'
          color='warning'
          onClick={storageHandler}
        >
          Save
        </Button>
      </Box>
    </>
  )
}

export default AddMaterial;