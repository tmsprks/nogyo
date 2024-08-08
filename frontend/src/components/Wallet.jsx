import React from "react";

function Wallet({ wallet, onDelete }) {
    const formattedDate = new Date(wallet.created_at).toLocaleDateString("en-US")

    return (
        <div>
            <p>{wallet.wallet_address}</p>
            <p>{wallet.wallet_chain}</p>
            <p>{formattedDate}</p>
            <button onClick={() => onDelete(wallet.id)}>
                Delete
            </button>
        </div>
    );
}

export default Wallet