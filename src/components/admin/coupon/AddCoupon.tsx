import {Link, useNavigate} from "react-router-dom";
import {DatePicker, DatePickerProps, GetProps, Input, notification, Space, Typography} from "antd";
import {runes} from "runes2";
import TextArea from "antd/es/input/TextArea";
import React, {useState} from "react";
import axios from "axios";
import loading from "../../loading/loading.tsx";
import Loading from "../../loading/loading.tsx";

function RangePicker(props: { size: string, onChange: any, showTime: { format: string }, format: string, onOk: any }) {
  return null;
}

function AddCoupon(){
  const [couponInput,setCouponInput] = useState({
    code:'',
    discount_type:'',
    discount_value:'',
    start_date:'',
    end_date:'',
    max_uses:'',
    uses_count:'',
    error_list: {} as { [key: string]: string },
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleInput =(e)=>{
   setCouponInput({...couponInput,[e.target.name]:e.target.value});
  }
  const submitCoupon = (e:React.FormEvent<HTMLFormElement>)=>{
    console.log("sale_start_date:", couponInput.start_date);
    console.log("sale_end_date:", couponInput.end_date);
    e.preventDefault();
    const data={
      code:couponInput.code,
      discount_type:couponInput.discount_type,
      discount_value:couponInput.discount_value,
      start_date:couponInput.start_date,
      end_date:couponInput.end_date,
      max_uses:couponInput.max_uses,
      uses_count:couponInput.uses_count,
    }
    axios.post(`api/store-coupon`,data).then(res=>{
      if(res.data.status===200){
        notification.success({
          message:'Success',
          description:res.data.message,
          placement:'bottomRight'
        })
        setLoading(false);
        navigate('/admin/view-coupon');
      }else if(res.data.status===422){
        notification.error({
          message:'Error',
          description:res.data.error,
          placement:'bottomRight'
        })
      }
    })
    console.log("data",data)
  }
  if(loading){
    return(
      <Loading></Loading>
    )
  }
  const onDateRangeChange = (dates, dateStrings) => {
    console.log("dates:", dates);
    console.log("dateStrings:", dateStrings);
    setCouponInput(prevState => ({
      ...prevState,
      start_date: dateStrings[0],
      end_date: dateStrings[1],
    }));
  };
  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

  const { RangePicker } = DatePicker;

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };
  return(
    <>
      <div className="container-fluid px-4 fade-in">
        <div className="card-header float-end">

        </div>
        <h4 className="mt-4">
          Add Coupon
          <Link to="/admin/view-coupon" className="btn btn-primary btn-sm float-end">View Coupon</Link>
        </h4>
        <form action="multipart/form-data" onSubmit={submitCoupon} className="needs-validation g-3">
          <Typography.Title level={5}>Code</Typography.Title>
          <div className="form-group mb-3">
            <Input type="text" name="code" onChange={handleInput} value={couponInput.code} placeholder="Code"></Input>
          </div>

          <div className="form-group mb-3">

            <Typography.Title level={5}>Discount Type</Typography.Title>
            <Input type="text" name="discount_type" onChange={handleInput} value={couponInput.discount_type}
                   size="large"
                   required placeholder="Discount Type" title={"Enter Name"}
            />
            {couponInput.error_list && couponInput.error_list.discount_type && (
              <div className="invalid-feedback ">
                <span>{couponInput.error_list.discount_type}</span>
              </div>
            )}
            {couponInput.discount_type && (
              <div className="text-muted float-end">{runes(couponInput.discount_type).length}</div>
            )}

          </div>

          <div className="form-group mb-3">
            <Typography.Title level={5}>Discount Value</Typography.Title>
            <Input type="text" name="discount_value" onChange={handleInput} value={couponInput.discount_value}
                   size="large"
                   required placeholder="Discount Value" title="Discount Value"

            />
            {couponInput.error_list && couponInput.error_list.discount_value && (
              <div className="invalid-feedback ">
                <span>{couponInput.error_list.discount_value}</span>
              </div>
            )}
            {couponInput.discount_value && (
              <div className="text-muted float-end">{runes(couponInput.discount_value).length}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <Typography.Title level={5}>Max Uses</Typography.Title>
            <TextArea name="max_uses" onChange={handleInput} value={couponInput.max_uses} required
                      placeholder="Enter Description" title={"Enter Description"}
            />
            {couponInput.error_list && couponInput.error_list.max_uses && (
              <div className="invalid-feedback ">
                <span>{couponInput.error_list.max_uses}</span>
              </div>
            )}
            {couponInput.max_uses && (
              <div className="text-muted float-end">{runes(couponInput.max_uses).length}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <Typography.Title level={5}>Uses Count</Typography.Title>
            <TextArea name="uses_count" onChange={handleInput} value={couponInput.uses_count} required
                      placeholder="Enter Description" title={"Enter Description"}
            />
            {couponInput.error_list && couponInput.error_list.uses_count && (
              <div className="invalid-feedback ">
                <span>{couponInput.error_list.uses_count}</span>
              </div>
            )}
            {couponInput.uses_count && (
              <div className="text-muted float-end">{runes(couponInput.uses_count).length}</div>
            )}
          </div>

          <div className="col-md-4 mb-3 form-group">
            <Space direction="vertical" size={0}>
              <Typography.Title level={5}>Time</Typography.Title>
              <RangePicker
                size="large"
                showTime={{format: 'HH:mm'}}
                format="YYYY-MM-DD HH:mm"
                onChange={onDateRangeChange}
                onOk={onOk}
              />
            </Space>
          </div>


          <button type="submit" className="btn btn-primary px-4 float-end">Add</button>


        </form>
      </div>
    </>
  )
}

export default AddCoupon
