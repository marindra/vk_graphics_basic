#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) out vec4 color;

layout (binding = 0) uniform sampler2D colorTex;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;

void sort(inout vec4 arr[3 * 3]) {

  for (int i = 1; i < 3 * 3; ++i) {
    vec4 value = arr[i];
    int posForValue = i;

    // array elements with indices from 0 to i - 1 are already sorted
    // now we are trying to append the element at index i to the sorted array
    for (int j = i - 1; j >= 0; --j) {
      if (value.x + value.y + value.z <
      arr[j].x + arr[j].y + arr[j].z) {
        arr[j + 1] = arr[j];
        posForValue = j;
      } else {
        break;
      }
    }
    arr[posForValue] = value;
  }

}

void main()
{
  vec4 nearestColors[3 * 3];

  // read neighbourhood
 nearestColors[0] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, -1));
 nearestColors[1] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1,  0));
 nearestColors[2] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1,  1));
 nearestColors[3] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0, -1));
 nearestColors[4] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0,  0));
 nearestColors[5] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0,  1));
 nearestColors[6] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1, -1));
 nearestColors[7] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1,  0));
 nearestColors[8] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1,  1));

  sort(nearestColors);

  color = nearestColors[4];
}
