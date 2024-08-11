import React from "react";

function Wallet({ wallet, onDelete }) {
    const formattedDate = new Date(wallet.created_at).toLocaleDateString("en-US")

    return (
        <div className="p-4 border border-green-300 rounded-lg mb-4">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    {wallet.wallet_address.slice(0, 4)}...{wallet.wallet_address.slice(-4)}
                </p>
                <p className="text-sm text-gray-700 ml-4">{wallet.wallet_chain}</p>
            </div>
            <p className="text-sm text-gray-500">Wallet Added On: {formattedDate}</p>
            <button
                onClick={() => onDelete(wallet.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
                Delete
            </button>
        </div>
    );
}

export default Wallet