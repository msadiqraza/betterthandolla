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
	posted: boolean;
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

const RewardProgram = ({ posted, rewardsdata }: RewardProgramProps) => {
	const [loading, setLoading] = useState(false);

	const [hasFollowed, setHasFollowed] = useState(false);
	const [url, setUrl] = useState("");
	const [err, setErr] = useState<string>();
	const [isVerified, setIsVerified] = useState(false);

	const router = useRouter();
	const { address, isConnected } = useAccount(); // Get wallet connection status
	const { openConnectModal } = useConnectModal();

	const handleFollow = () => {
		setHasFollowed(true);
	};

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
			// Optionally throw an error or return defaults
			throw new Error("Invalid URL format");
		}

		const username = match[1];
		const tweetId = match[2];

		return {
			username,
			tweetId,
		};
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (posted) handleVerify();
		else console.log("User has not posted");
	};

	const handleVerify = async (): Promise<void> => {
		console.log("url", url);

		setLoading(true);
		let wallet: `0x${string}`;

		if (address && isConnected) {
			wallet = `0x${address.slice(2)}`;
		} else {
			wallet =
				"0x0000000000000000000000000000000000000000";
		}

		console.log("wallet", wallet);
		const { username, tweetId } =
			extractUsernameAndTweetId(url);

		console.log("username", username, "tweetId", tweetId);

		const userFound = await findUser(username || "", wallet);
		console.log("this is the userFound: ", userFound);
		// setUserFound(userFound);

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

	const [connectionTriggered, setConnectionTriggered] = useState(false);

	useEffect(() => {
		if (connectionTriggered && isConnected) {
			handlePostConnection(); // Call the function after successful connection
		}
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
		<div className="bg-gradient-to-tr from-[rgb(92,33,65)] to-[rgb(50,42,57)] text-white text-md rounded-lg p-4 mx-auto">
			<h2 className="text-md font-bold mb-4">
				{rewardsdata.heading}
			</h2>

			{/* Follow */}
			<div className="flex items-center space-x-2 mb-2">
				<span className="w-7 h-7 flex items-center justify-center bg-white text-purple-900 rounded-lg font-bold">
					1
				</span>
				<span className="text-md">
					{rewardsdata.follow.text}
				</span>
				<Link
					href={`https://x.com/${rewardsdata.follow.clientTwitterAcct}`}
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleFollow}
					className="inline-block bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300 ease-in-out hover:shadow-lg"
				>
					{rewardsdata.follow.button}
				</Link>
			</div>

			{/* Post */}
			<div className="flex items-center space-x-2 mb-3">
				<span className="w-7 h-7 flex items-center justify-center bg-white text-purple-900 rounded-lg font-bold">
					2
				</span>
				<span className="text-md">
					{rewardsdata.post.text}
				</span>
				<button
					onClick={() => {
						if (
							!posted &&
							hasFollowed
						)
							handlePost();
					}}
					className="inline-block bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm transition duration-300 ease-in-out hover:shadow-lg"
				>
					{rewardsdata.post.button}
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
						rewardsdata.verify
							.placeholder
					}
					value={url}
					onChange={(
						e: React.ChangeEvent<HTMLInputElement>
					) => setUrl(e.target.value)}
					className="flex-grow border border-gray-300 rounded px-2 py-1.5 max-w-[430px] text-black text-sm"
				/>
				<button
					type="submit"
					className="bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-[9px] rounded-lg text-sm"
				>
					{rewardsdata.verify.button}
				</button>
			</form>

			{/* Step 3 */}
			<div className="flex items-center space-x-2 mb-2">
				<span className="w-8 h-8 flex items-center justify-center bg-white text-purple-900 rounded-lg font-bold">
					3
				</span>
				<span>{rewardsdata.sign.text}</span>
				<button
					onClick={() => {
						if (!isVerified)
							handleButtonClick();
					}}
					className="bg-gradient-to-r from-red-500 via-pink-500 to-red-500 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm"
				>
					{rewardsdata.sign.button}
				</button>
			</div>

			<p className="text-sm mt-3">
				{rewardsdata.footer}
			</p>

			{loading && (
				<div
					className={`absolute h-[170vh] lg:h-h-screen inset-0 bg-black bg-opacity-50`}
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
	);
};

export default RewardProgram;
