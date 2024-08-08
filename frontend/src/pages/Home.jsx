// import React from 'react'
// import { Link } from 'react-router-dom'

// const Home = () => {
//   return (
//     <div>
//       <div>Home</div>
//       <Link to="/logout" className="text-green-500 hover:text-blue-500">
//         Logout
//       </Link>
//     </div>
//   )
// }

// export default Home

import { useState, useEffect } from "react";
import api from "../api";
import Wallet from "../components/Wallet"

function Home() {
    const [wallets, setWallets] = useState([]);
    const [wallet_chain, setBlockchain] = useState("");
    const [wallet_address, setWalletAddress] = useState("");

    useEffect(() => {
        getWallets();
    }, []);

    const getWallets = () => {
        api
            .get("/api/wallets/")
            .then((res) => res.data)
            .then((data) => {
                setWallets(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteWallet = (id) => {
        api
            .delete(`/api/wallets/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Wallet deleted!");
                else alert("Failed to delete wallet.");
                getWallets();
            })
            .catch((error) => alert(error));
    };

    const createWallet = (e) => {
        e.preventDefault();
        api
            .post("/api/wallets/", { wallet_chain, wallet_address })
            .then((res) => {
                if (res.status === 201) alert("Wallet created!");
                else alert("Failed to make wallet.");
                getWallets();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Wallets</h2>
                {wallets.map((wallet) => (
                    <Wallet wallet={wallet} onDelete={deleteWallet} key={wallet.id} />
                ))}
            </div>
            <h2>Create a Wallet</h2>
            <form onSubmit={createWallet}>
                <label htmlFor="wallet_address">Wallet Address:</label>
                <br />
                <input
                    type="text"
                    id="wallet_address"
                    name="wallet_address"
                    required
                    onChange={(e) => setWalletAddress(e.target.value)}
                    value={wallet_address}
                />
                <label htmlFor="wallet_chain">Blockchain:</label>
                <br />
                <textarea
                    id="wallet_chain"
                    name="wallet_chain"
                    required
                    value={wallet_chain}
                    onChange={(e) => setBlockchain(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;