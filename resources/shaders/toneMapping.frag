#version 450
#extension GL_ARB_separate_shader_objects : enable
#extension GL_GOOGLE_include_directive : require

#include "common.h"

layout(location = 0) out vec4 out_fragColor;

layout (location = 0 ) in VS_OUT
{
  //vec3 wPos;
  //vec3 wNorm;
  //vec3 wTangent;
  vec2 texCoord;
} surf;

layout(binding = 0, set = 0) uniform AppData
{
  UniformParams Params;
};

layout (binding = 1) uniform sampler2D view16Map;

const float gammaInv = 1.0f / 2.2f;

void main()
{
  vec4 color16 = texture(view16Map, surf.texCoord);
  if (Params.toneMappingMode == 0) // None
  {
	out_fragColor = vec4(clamp(color16.x, 0.0f, 1.0f), clamp(color16.y, 0.0f, 1.0f), clamp(color16.z, 0.0f, 1.0f), 1.0f);
  } else if (Params.toneMappingMode == 1) // Reinhard
  {
	out_fragColor = vec4(
		pow(color16.x / (1.0f + color16.x), gammaInv),
		pow(color16.y / (1.0f + color16.y), gammaInv),
		pow(color16.z / (1.0f + color16.z), gammaInv),
		1.0f);
  } else if (Params.toneMappingMode == 2) // Exposure
  {
	out_fragColor = vec4(
		pow(1.0f - exp(-color16.x * Params.exposure), gammaInv),
		pow(1.0f - exp(-color16.y * Params.exposure), gammaInv),
		pow(1.0f - exp(-color16.z * Params.exposure), gammaInv),
		1.0f);
  }
}