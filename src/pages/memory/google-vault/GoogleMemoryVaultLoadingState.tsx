import { VaultData } from "../vault/MemoryVault";

type Props = {
  vaultData: VaultData;
  resourceId: string;
  onClose: () => void;
};
export default function GoogleMemoryVaultLoadingState({
  resourceId,
  vaultData,
  onClose,
}: Props) {
  return (
    <span>
      Loading... {resourceId} {vaultData.encryptionKey}
    </span>
  );
}
