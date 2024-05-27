import { Link, useNavigate } from "react-router-dom";
import {Button, Checkbox, ColorPicker, Input, List, message} from "antd";
import { useState } from "react";
import axios from "axios";
import tinycolor from 'tinycolor2';
import colorNameList from 'color-name-list';
import './color.css'


function AddColor() {
  const navigate = useNavigate();
  const [colorInput, setColorInput] = useState({
    name: '',
    code: '',
    status: false,
    hex_code: '',
    error_list: {} as { [key: string]: string },
  });

  const handleInput = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setColorInput({ ...colorInput, [e.target.name]: value });
  };

  const [color, setColor] = useState('#1677ff');
  const getColorName = (hexCode) => {
    const colorArray = Object.values(colorNameList);
    const colorObject = colorArray.find(color => typeof color === 'string' && color.toLowerCase() === hexCode.toLowerCase());
    return colorObject ? colorObject : '';
  };

  const handleColorChange = (color) => {
    const hexColor = tinycolor(color).toHexString();
    setColor(hexColor);
    setColorInput({ ...colorInput, hex_code: hexColor, name: getColorName(hexColor) });
  };


  const submitColor = (e) => {
    e.preventDefault();

    const data = {
      name: colorInput.name,
      code: colorInput.code,
      hex_code: color,
      status: colorInput.status,
    };

    axios.post(`/api/store-color`, data).then(res => {
      if (res.data.status === 200) {
        message.open({
          type: 'success',
          content: res.data.message,
        });
        navigate('/admin/view-color');
      } else if (res.data.status === 400) {
        setColorInput({ ...colorInput, error_list: res.data.errors });
      }
    });
    console.log(data);
  };

  return (
    <div className="container-fluid px-4 fade-in">
      <h4>Add Color</h4>
      <Link to="/admin/view-color" className="btn btn-primary btn-sm float-end">View Color</Link>
      <form action="multipart/form-data" onSubmit={submitColor}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <Input size="large" name="name" placeholder="Name" onChange={handleInput} value={colorInput.name}/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="code">Code</label>
          <Input size="large" name="code" onChange={handleInput} value={colorInput.code} placeholder="Code"/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="hex_code">Hex Code</label>
          <Input size="large" name="hex_code" value={colorInput.hex_code} placeholder="Hex Code" readOnly/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="color">Color</label>
          <br/>
          <ColorPicker
            value={color}
            onChange={(color) => handleColorChange(color.toHexString())}
            showText
            size="large"
          />
        </div>
        <div className="form-group mb-3">
          <div className="checkbox-wrapper-28">
            <Input id="tmp-28" type="checkbox" name="status" className="promoted-input-checkbox" onChange={handleInput}
                   checked={colorInput.status}/>
            <svg>
              <use xlinkHref="#checkmark-28"/>
            </svg>
            <label htmlFor="tmp-28">
              Status
            </label>
            <svg xmlns="http://www.w3.org/2000/svg">
              <symbol id="checkmark-28" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-miterlimit="10" fill="none" d="M22.9 3.7l-15.2 16.6-6.6-7.1">
                </path>
              </symbol>
            </svg>
          </div>
        </div>
        <Button type="primary" htmlType="submit" className="float-end">Add</Button>
      </form>
    </div>
  );
}

export default AddColor;
