import { Grid, Stack } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import {  mintPublic, mintWhitelist, sampleNFT } from '@pages/utils/_web3';
import MintNFTCard from './mint-nft-card';
import useSWR from 'swr';
import Web3 from 'web3';

const NOT_CLAIMABLE = 0;
const ALREADY_CLAIMED = 1;
const CLAIMABLE = 2;

const MintNFT = () => {
  const web3 = new Web3(Web3.givenProvider)

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { active, account, chainId } = useWeb3React();

  const [whitelistClaimable, setWhitelistClaimable] = useState(CLAIMABLE);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);


  const [whitelistMintStatus, setWhitelistMintStatus] = useState();
  const [publicMintStatus, setPublicMintStatus] = useState();

  const [numToMint, setNumToMint] = useState(1);







  const onMintWhitelist = async () => {
    const { success, status } = await mintWhitelist(account, numToMint);
    console.log(status);
    setWhitelistMintStatus(success);
  };

  const onPublicMint = async () => {
    const { success, status } = await mintPublic(account, numToMint);
    console.log(status);
    setPublicMintStatus(success);
  };

  return (
    <>
      <Stack id="demo">

        <Grid container spacing={4} justifyContent="center" alignItems="center">

  <Grid item> 
            <MintNFTCard
              title={'Whitelist Mint'}
              description={'Cost: 1 Free/wallet'}
              canMint={whitelistClaimable}
              mintStatus={whitelistMintStatus}
              showNumToMint={true}
              setNumToMint={setNumToMint}
              action={onMintWhitelist}
            />
          </Grid>
          <Grid item>
            <MintNFTCard
              title={'Public Mint'}
              description={'0.01 ETH'}
              canMint={active}
              mintStatus={publicMintStatus}
              showNumToMint={true}
              setNumToMint={setNumToMint}
              action={onPublicMint}
            />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default MintNFT;
