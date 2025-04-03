export interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: {
    name: string;
    image: string;
    abilities: string[];
    height?: number;
    weight?: number;
    types?: string[];
    stats?: { name: string; value: number }[];
  };
}
