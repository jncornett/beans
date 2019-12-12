import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

export const GENOMES = gql`
  query Genomes($nextToken: ID, $count: Int) {
    genomes(nextToken: $nextToken, count: $count) {
      items {
        id
        createdAt
        code {
          version
          data
        }
      }
      nextToken
    }
  }
`;

export type Code = {
  version: string;
  data: string;
};

export type Genome = {
  id: string;
  createdAt: string;
  code: Code;
};

export type GenomesQuery = {
  genomes: {
    items: Genome[];
    nextToken?: string;
  };
};

export type GenomesVariables = {
  nextToken?: string;
  count?: number;
};

export const useGenomes = (variables: GenomesVariables = {}) =>
  useQuery<GenomesQuery, GenomesVariables>(GENOMES, { variables });

export const GENOME = gql`
  query Genome($id: ID!) {
    genome(id: $id) {
      id
      createdAt
      code {
        version
        data
      }
    }
  }
`;

export type GenomeQuery = {
  genome: Genome;
};

export type GenomeVariables = {
  id: string;
};

export const useGenome = (variables: GenomeVariables) =>
  useQuery<GenomeQuery, GenomeVariables>(GENOME, { variables });

export const ADD_GENOME = gql`
  mutation AddGenome($code: Code!) {
    addGenome(code: $code) {
      id
      createdAt
      code {
        version
        data
      }
    }
  }
`;

export type AddGenomeMutation = {
  addGenome: Genome;
};

export type AddGenomeVariables = {
  code: {
    version: string;
    data: string;
  };
};

export const useAddGenome = () => useMutation<AddGenomeMutation, AddGenomeVariables>(ADD_GENOME);
