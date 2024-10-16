"use client";

import { MagnifyingGlass } from "react-loader-spinner";
import { Backdrop } from "@mui/material";

const Loader = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        data-testid="loader-backdrop"
      >
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </Backdrop>
    </div>
  );
};

export default Loader;
//
