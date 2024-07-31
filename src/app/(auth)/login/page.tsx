"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");
  const [pwd, setPwd] = React.useState<string>("");
  const [errorFront, setErrorFront] = React.useState<string | null>(null);

  const { login, isLoading, error } = useLogin();
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    if (!isLoading && localStorage.getItem("schoolOwner")) {
      router.push("/owne-school");
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !pwd) {
      setErrorFront("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await login(email, pwd);
    } catch (error) {
      console.error(error);
      setErrorFront("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex justify-center items-center px-5 mb-10 md:p-10">
      <div
        className="p-6 rounded-lg py-10 max-w-lg"
        style={{ boxShadow: "0px -1px 26px 7px rgba(80,89,88,0.91)" }}
      >
        <h2 className="text-3xl mb-5 mt-2 text-center font-bold">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: 1 }}>
            <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
              <TextField
                required
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Mot de Passe *
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Mot de Passe *"
                required
              />
            </FormControl>

            <div className="ml-5">
              {error && <p className="text-red-500">{error}</p>}
              {errorFront && <p className="text-red-500">{errorFront}</p>}
              <Link href={"#"} className="hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="flex justify-center w-full">
              {isLoading ? (
                <button
                  disabled
                  className="my-5 px-10 py-3 w-full md:w-3/5 bg-[#505958c1] text-white font-bold rounded-full"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Connexion
                </button>
              ) : (
                <button
                  type="submit"
                  className="my-5 px-10 py-3 w-full md:w-3/5 bg-orange-400 btn hover:bg-orange-500 text-white font-bold rounded-full"
                >
                  Se connecter
                </button>
              )}
            </div>
            <div className="text-center w-full">
              <p>Vous êtes nouveau ?</p>
              <Link
                href={"/signup"}
                className="font-bold text-orange-500 text-xl"
              >
                Inscrivez vous
              </Link>
            </div>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default Login;
