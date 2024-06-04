import React, {useEffect, useState} from "react";
import dayjs from 'dayjs';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {DatePicker, DatePickerProps, GetProps, Input, message, notification, Space, Typography} from "antd";
import Loading from "../../loading/loading.tsx";
import {runes} from "runes2";
import TextArea from "antd/es/input/TextArea";

function EditCoupon(){
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
  const {id} = useParams();
  useEffect(()=>{
    axios.get(`/api/edit-coupon/${id}`).then(res=>{
      if(res.data.status === 200){
        setCouponInput(res.data.coupon);
      }
      else if(res.data.status === 404){
        notification.error({
          message:'Error',
          description:res.data.message,
          placement:'bottomRight'
        })
        navigate('/admin/view-coupon')
      }
      setLoading(false);
    });
  },[id])
  const updateCoupon = (e:React.FormEvent<HTMLFormElement>)=>{
    console.log("sale_start_date:", couponInput.start_date);
    console.log("sale_end_date:", couponInput.end_date);
    e.preventDefault();
    const coupon_id = id;
    const data= couponInput
    axios.post(`api/update-coupon/${coupon_id}`,data).then(res=>{
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
          description:res.data.message,
          placement:'bottomRight'
        })
      }else if(res.data.status===404){
        notification.error({
          message:'Error',
          description:res.data.message,
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
          Edit Coupon
          <Link to="/admin/view-coupon" className="btn btn-primary btn-sm float-end">View Coupon</Link>
        </h4>
        <form action="multipart/form-data" onSubmit={updateCoupon} className="needs-validation g-3">
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


          </div>

          <div className="form-group mb-3">
            <Typography.Title level={5}>Discount Value</Typography.Title>
            <Input type="text" name="discount_value" onChange={handleInput} value={couponInput.discount_value}
                   size="large"
                   required placeholder="Discount Value" title="Discount Value"

            />

          </div>

          <div className="form-group mb-3">
            <Typography.Title level={5}>Max Uses</Typography.Title>
            <TextArea name="max_uses" onChange={handleInput} value={couponInput.max_uses} required
                      placeholder="Enter Description" title={"Enter Description"}
            />

          </div>

          <div className="form-group mb-3">
            <Typography.Title level={5}>Uses Count</Typography.Title>
            <TextArea name="uses_count" onChange={handleInput} value={couponInput.uses_count} required
                      placeholder="Enter Description" title={"Enter Description"}
            />

          </div>

          <div className="col-md-4 mb-3 form-group">
            <Space direction="vertical" size={0}>
              <Typography.Title level={5}>Time</Typography.Title>
              <RangePicker
                size="large"
                showTime={{format: 'HH:mm'}}
                format="YYYY-MM-DD HH:mm"
                onChange={onDateRangeChange}
                value={[
                  couponInput.start_date ? dayjs(couponInput.start_date, 'YYYY-MM-DD HH:mm') : null,
                  couponInput.end_date ? dayjs(couponInput.end_date, 'YYYY-MM-DD HH:mm') : null
                ]}
                onOk={onOk}
              />
            </Space>
          </div>


          <button type="submit" className="btn btn-primary px-4 float-end">Edit</button>


        </form>
      </div>
    </>
  )
}
export default EditCoupon
