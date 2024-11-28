import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast"

export default function App() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const {toast} = useToast();
  
  const onSubmit = (data) => {
  
    dispatch(loginUser(data))
      .then((res) => {
        console.log("res :: ",res);
        
        if (res?.payload?.success) {
          toast({
            title: res?.payload?.message,
            description: "You have successfully loged in",
          })
          
        }else {
          toast({
            title: "Error",
            description: res?.payload?.data,
             variant: "destructive" 
          });
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
        toast({
          title: "Error",
          description: res?.payload?.message,
           variant: "destructive" 
        });
      });
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
