"use client";

import checkTwitterFollow from "@/modules/api/follow";
import checkTwitterPost from "@/modules/api/post";
import { findUser } from "@/modules/supabase/findUser";
import { insertUser } from "@/modules/supabase/insertUser";
import { updateWalletAddress } from "@/modules/supabase/UpdateWalletAddress";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "../../i18n/routing";
import Loading from "./Loading";

interface RewardProgramProps {
	rewardsdata: {
		heading: string;
		follow: {
			text: string;
			clientTwitterAcct: string;
			button: string;
		};
		post: {
			text: string;
			button: string;
		};
		verify: {
			placeholder: string;
			button: string;
		};
		sign: {
			text: string;
			button: string;
		};
		footer: string;
	};
}

const RewardProgram = ({ rewardsdata }: RewardProgramProps) => {
	const [loading, setLoading] = useState(false);
	const [url, setUrl] = useState("");
	const [err, setErr] = useState<string>();
	const [isVerified, setIsVerified] = useState(false);

	const router = useRouter();
	const { address, isConnected } = useAccount(); // Get wallet connection status
	const { openConnectModal } = useConnectModal();

	const [connectionTriggered, setConnectionTriggered] = useState(false);


	const handlePost = () => {
		console.log("inside post");
		router.push("/questionnare");
	};

	const extractUsernameAndTweetId = (
		url: string
	): { username: string; tweetId: string } => {
		const regex = /https:\/\/x\.com\/([^/]+)\/status\/(\d+)/;
		const match = url.match(regex);

		if (!match) {
			setErr(
				"The URL is not accurate.\nIt should be in the form:\nhttps://x.com/username/status/tweetId"
			);
			return {username:"", tweetId:""}
		}

		const username = match[1];
		const tweetId = match[2];

		return {
			username,
			tweetId,
		};
	};

	useEffect(() => {
		if (err) {
			setLoading(false)
			setTimeout(() => {
				setErr("");
			}, 6000);
		}
	}, [err]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		handleVerify();
	};

	const handleVerify = async (): Promise<void> => {
		let wallet: `0x${string}`;

		if (address) {
			wallet = `0x${address.slice(2)}`;
		} else {
			wallet =
				"0x0000000000000000000000000000000000000000";
		}

		const { username, tweetId } =
			extractUsernameAndTweetId(url);

		if (username && tweetId) {
			setLoading(true);

			console.log("username", username, "tweetId", tweetId);
			const userFound = await findUser(username || "", wallet);

			if (!userFound) {
				// THAT USER IS NEW
				try {
					console.log("Inside userFound");

					const insert = insertUser(
						username || "",
						wallet,
						tweetId
					);
					console.log("Insert user", insert);

					const checkFollow =
						await checkTwitterFollow(
							username
						);

					if (checkFollow === true) {
						console.log(
							"User is following"
						);

						const checkPost =
							await checkTwitterPost(
								tweetId
							);

						if (checkPost === true) {
							setIsVerified(true);
							setErr("");
						} else if (
							checkPost === false
						) {
							setErr(
								"You have not posted about us on X. \nPlease post and try again."
							);
						} else if (checkPost === -1) {
							setErr(
								"There was a problem while verifying post. \nTry again later "
							);
						}
					} else if (checkFollow === false) {
						setErr(
							"You have not followed us on X. \nPlease follow and try again."
						);
					} else if (checkFollow === -1) {
						setErr(
							"There was a problem while verifying follow. \nTry again later "
						);
					}
				} catch (error) {
					setErr(
						`Error during verification: ${error}`
					);
					console.error(
						"Error during verification:",
						error
					);
				}
			} else {
				setErr("User has already redeemed their reward");
				// setUserFound(-1); // -1 indicates user already found
			}
			setLoading(false);
		}
	};

	const { signMessage } = useSignMessage({
		mutation: {
			onSuccess(data: `0x${string}`) {
				console.log(
					"Signature received:",
					data
				);
				router.push("/finished");
			},
			onError(error: Error) {
				console.error(
					"Error signing message:",
					error
				);
			},
		},
	});


	useEffect(() => {
		if (connectionTriggered && isConnected) {
			handlePostConnection(); // Call the function after successful connection
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isConnected, connectionTriggered]);

	const handlePostConnection = async () => {
		// Logic to execute after the wallet is connected
		const { username } = extractUsernameAndTweetId(url);
		if (address) {
			console.log(address, "address");

			const updateWallet = await updateWalletAddress(
				username,
				address
			);
			console.log(updateWallet);

			signMessage({
				message: "Hello from BetterThanDollar!",
			});
		}
	};

	const handleButtonClick = async () => {
		if (!isConnected) {
			if (openConnectModal) {
				openConnectModal(); // Open the wallet connection modal
				setConnectionTriggered(true); // Mark that connection was triggered
			} else {
				console.error(
					"Connect modal is not available"
				);
			}
		} else {
			console.log("Wallet is already connected");
			handlePostConnection(); // Directly handle connection if already connected
		}
	};

	return (
		<div className=" bg-gradient-to-r from-[rgb(104,65,121)] to-[rgb(65,54,98)] text-white rounded-[30px] w-full p-1">
			<div className="p-4 mx-auto rounded-[30px] h-full w-full bg-gradient-to-tr from-[rgb(92,33,65)]  to-[rgb(50,42,57)]">
				<p className="mb-4">
					{rewardsdata.heading}
				</p>

				{/* Follow */}
				<div className="flex items-center space-x-2 mb-2">
					<h3 className="min-w-10 min-h-10 flex items-center justify-center bg-white text-black rounded-md">
						1
					</h3>
					<p>
						{
							rewardsdata
								.follow
								.text
						}
					</p>
					<Link
						href={`https://x.com/${rewardsdata.follow.clientTwitterAcct}`}
						target="_blank"
						rel="noopener noreferrer"
						className="p inline-block bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300 ease-in-out hover:shadow-lg"
					>
						{
							rewardsdata
								.follow
								.button
						}
					</Link>
				</div>

				{/* Post */}
				<div className="flex items-center space-x-2 mb-3">
					<h3 className="min-w-10 min-h-10 flex items-center justify-center bg-white text-black rounded-md">
						2
					</h3>
					<p>
						{" "}
						{
							rewardsdata
								.post
								.text
						}
					</p>
					<button
						onClick={() => {
							handlePost();
						}}
						className="p inline-block bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300 ease-in-out hover:shadow-lg"
					>
						{
							rewardsdata
								.post
								.button
						}
					</button>
				</div>

				{/* Tweet Link Input */}
				<form
					className="flex items-center space-x-2 mb-3"
					onSubmit={handleSubmit}
				>
					<input
						type="text"
						placeholder={
							rewardsdata
								.verify
								.placeholder
						}
						value={url}
						onChange={(
							e: React.ChangeEvent<HTMLInputElement>
						) =>
							setUrl(
								e
									.target
									.value
							)
						}
						className="flex-grow border border-gray-300 rounded px-2 py-1.5 max-w-[430px] text-black text-sm"
					/>
					<button
						type="submit"
						className="p bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-[9px] rounded-lg text-sm"
					>
						{
							rewardsdata
								.verify
								.button
						}
					</button>
				</form>

				{/* Step 3 */}
				<div className="flex items-center space-x-2 mb-2">
					<h3 className="min-w-10 min-h-10 flex items-center justify-center bg-white text-black rounded-md">
						3
					</h3>
					<p>{rewardsdata.sign.text}</p>
					<button
						onClick={() => {
							if (
								isVerified
							)
								handleButtonClick();
							else
								setErr(
									"You have not completed the signin process"
								);
						}}
						className="p bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm"
					>
						{
							rewardsdata
								.sign
								.button
						}
					</button>
				</div>

				<p className=" mt-3">
					{rewardsdata.footer}
				</p>

				{/* fix */}
				{loading && (
					<div
						className={`absolute h-[170vh] lg:h-screen inset-0 bg-black bg-opacity-50`}
					>
						<Loading />
					</div>
				)}

				{err && (
					<div className="absolute px-4 py-2 rounded-xl bottom-4 right-4 bg-red-500 text-white font-semibold">
						<div className="sticky">
							{err}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default RewardProgram;
