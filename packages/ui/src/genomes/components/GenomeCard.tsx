import * as React from "react";
import { Genome } from "../models/genome";

type GenomeCardProps = {
  genome: Genome;
};

export const GenomeCard = ({ genome }: GenomeCardProps) => <pre>{JSON.stringify(genome)}</pre>;
