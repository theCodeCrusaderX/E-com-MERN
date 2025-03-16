import React from 'react'
import { Card,CardContent } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'


function AddressCard({cardInfo,handleDeleteAddress,handleEditAddress,setCurrAddress}) {


  return (
    <Card onClick={() => setCurrAddress(cardInfo)} >
        <CardContent className='flex flex-col gap-4 p-5 min-w-[300px]z'>
            <Label>
                Address : {cardInfo.address}
            </Label>
            <Label>
                city : {cardInfo.city}
            </Label>
            <Label>
                pincode : {cardInfo.pincode}
            </Label>
            <Label>
                phone : {cardInfo.phone}
            </Label>
            <Label>
                notes : {cardInfo.notes}
            </Label>
        </CardContent>
        <div className='flex justify-around'>
          <Button onClick={() => handleEditAddress(cardInfo)} >Edit</Button>
          <Button onClick={() => handleDeleteAddress(cardInfo._id)}>Delete</Button>
        </div>
    </Card>
  )
}

export default AddressCard