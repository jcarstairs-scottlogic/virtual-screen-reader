import { ARIAPropertyMap, ARIARoleDefinitionKey, roles } from "aria-query";
import { globalStatesAndProperties } from "../../getRole";

const ignoreAttributesWithAccessibleValue = ["aria-placeholder"];

export const getAttributesByRole = ({
  accessibleValue,
  role,
}: {
  accessibleValue: string;
  role: string;
}) => {
  const {
    props: implicitRoleAttributes = {},
    prohibitedProps: prohibitedAttributes = [],
  } = (roles.get(role as ARIARoleDefinitionKey) ?? {}) as {
    props: ARIAPropertyMap;
    prohibitedProps: string[];
  };

  const uniqueAttributes = Array.from(
    new Set([
      ...Object.keys(implicitRoleAttributes),
      ...globalStatesAndProperties,
    ])
  )
    .filter((attribute) => !prohibitedAttributes.includes(attribute))
    .filter(
      (attribute) =>
        !accessibleValue ||
        !ignoreAttributesWithAccessibleValue.includes(attribute)
    );

  return uniqueAttributes.map((attribute) => [
    attribute,
    implicitRoleAttributes[attribute] ?? null,
  ]);
};
