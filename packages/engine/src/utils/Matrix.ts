import * as THREE from 'three';

export class Vec2 extends THREE.Vector2 {
    constructor(x = 0, y = 0) {
        super(x, y);
    }
}

export class Vec3 extends THREE.Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z);
    }
}

export class Vec4 extends THREE.Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        super(x, y, z, w);
    }
}

export class Mat3 extends THREE.Matrix3 {
    constructor(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number) {
        super(m00, m01, m02, m10, m11, m12, m20, m21, m22)
    }
}

export class Mat4 extends THREE.Matrix4 {

    constructor(m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number) {
        super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
    }
}

export class Quat extends THREE.Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        super(x, y, z, w);
    }
}

