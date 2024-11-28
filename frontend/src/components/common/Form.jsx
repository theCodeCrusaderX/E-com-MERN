import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function CommonForm({}) {
  const { register, handleSubmit } = useForm();

  
  const onSubmit = (data) => {
  
    console.log(data);
    
  };

  return (
    <div>
      <div className="flex flex-col mb-2">
        <p>don't have account <Link to = "/auth/register">Register</Link></p>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <Label>Enter your email</Label>
          <Input type="text" placeholder="Enter email" {...register("email")} />
          <Label>Enter your password</Label>
          <Input
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />

          <Button type="submit" >Submit</Button>
        </form>
      </div>
    </div>
  );
}
