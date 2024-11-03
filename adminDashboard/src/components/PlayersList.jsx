import React from "react";

const PlayerLists = ({ data }) => {
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <h3 className="font-bold text-xl mb-4">Registered UsersList</h3>

        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">EmailId</th>
              <th className="p-3">Address</th>
              <th className="p-3">userId/Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`border-t ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3">
                  {row.userProfile.profileImage == null ? (
                    <img
                      src="/playerImg.png"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <img
                      src={row.userProfile.profileImage}
                      alt=""
                      className="w-10 h-10 rounded-full"
                      loading="lazy"
                    />
                  )}
                </td>

                <td className="p-3">{row.userProfile.firstName || "null"}</td>
                <td className="p-3">{row.userProfile.emailId || "null"}</td>
                <td className="p-3">{row.userProfile.address || "null"}</td>
                <td className="p-3">{row.userId.slice(0,5)+"xxxxx"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerLists;
